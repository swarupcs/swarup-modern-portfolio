import { type NextRequest, NextResponse } from 'next/server';

interface BlogPost {
  id: string;
  title: string;
  brief: string;
  slug: string;
  url: string;
  publishedAt: string;
  coverImage?: {
    url: string;
  };
}

interface HashNodeBlogListResponse {
  data: {
    publication: {
      posts: {
        edges: Array<{
          node: BlogPost;
        }>;
      };
    };
  };
}

interface HashNodeBlogDetailResponse {
  data: {
    post: {
      id: string;
      title: string;
      slug: string;
      url: string;
      publishedAt: string;
      brief: string;
      content: {
        markdown: string;
        html: string;
      };
      author: {
        name: string;
        profilePicture?: string;
      };
      coverImage?: {
        url: string;
      };
      tags?: Array<{
        name: string;
        slug: string;
      }>;
    };
  };
}

const HASHNODE_ENDPOINT = 'https://gql.hashnode.com';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  const hostname = process.env.NEXT_PUBLIC_HASHNODE_HOSTNAME;
  const postId = searchParams.get('id');

  if (!hostname) {
    return NextResponse.json(
      { error: 'Missing NEXT_PUBLIC_HASHNODE_HOSTNAME environment variable' },
      { status: 400 }
    );
  }

  if (action === 'detail' && postId) {
    const query = `
      query {
        post(id: "${postId}") {
          id
          title
          slug
          url
          publishedAt
          brief
          content {
            markdown
          }
          author {
            name
            profilePicture
          }
          coverImage {
            url
          }
          tags {
            name
            slug
          }
        }
      }
    `;

    try {
      const response = await fetch(HASHNODE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        console.error('[v0] Hashnode API error - Status:', response.status);
        throw new Error(`Hashnode API returned ${response.status}`);
      }

      const data = await response.json();

      if ((data as any).errors) {
        console.error('[v0] Hashnode GraphQL error:', (data as any).errors);
        return NextResponse.json(
          { error: 'Failed to fetch blog post' },
          { status: 500 }
        );
      }

      return NextResponse.json(data.data.post);
    } catch (error) {
      console.error('[v0] Hashnode API error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch blog post' },
        { status: 500 }
      );
    }
  }

  // Fetch blog posts list
  const query = `
    query {
      publication(host: "${hostname}") {
        id
        posts(first: 10) {
          edges {
            node {
              id
              title
              brief
              slug
              url
              publishedAt
              coverImage {
                url
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(HASHNODE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      console.error('[v0] Hashnode API error - Status:', response.status);
      throw new Error(`Hashnode API returned ${response.status}`);
    }

    const data: HashNodeBlogListResponse = await response.json();

    if ((data as any).errors) {
      console.error('[v0] Hashnode GraphQL error:', (data as any).errors);
      return NextResponse.json(
        { error: 'Failed to fetch blogs' },
        { status: 500 }
      );
    }

    // Extract posts from edges
    const posts = data.data.publication.posts.edges.map((edge) => edge.node);
    return NextResponse.json(posts);
  } catch (error) {
    console.error('[v0] Hashnode API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}
