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

interface BlogListEdge {
  node: BlogPost;
}

interface HashNodeBlogListResponse {
  data: {
    publication: {
      posts: {
        edges: BlogListEdge[];
      };
    };
  };
  errors?: Array<{ message: string }>;
}

interface BlogDetail {
  id: string;
  title: string;
  slug: string;
  url: string;
  publishedAt: string;
  brief: string;
  content: {
    markdown: string;
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
}

interface HashNodeBlogDetailResponse {
  data: {
    post: BlogDetail | null;
  };
  errors?: Array<{ message: string }>;
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

  // ---------------- DETAIL QUERY ----------------
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error(`Hashnode API returned ${response.status}`);
      }

      const data: HashNodeBlogDetailResponse = await response.json();

      if (data.errors && data.errors.length > 0) {
        return NextResponse.json(
          { error: data.errors[0].message },
          { status: 500 }
        );
      }

      return NextResponse.json(data.data.post);
    } catch (error) {
      return NextResponse.json(
        { error: 'Failed to fetch blog post' },
        { status: 500 }
      );
    }
  }

  // ---------------- LIST QUERY ----------------
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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`Hashnode API returned ${response.status}`);
    }

    const data: HashNodeBlogListResponse = await response.json();

    if (data.errors && data.errors.length > 0) {
      return NextResponse.json(
        { error: data.errors[0].message },
        { status: 500 }
      );
    }

    const posts = data.data.publication.posts.edges.map((edge) => edge.node);
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}
