// lib/hashnode.ts
const HASHNODE_API = 'https://gql.hashnode.com';

export interface HashnodePost {
  id: string;
  title: string;
  brief: string;
  slug: string;
  coverImage?: {
    url: string;
  };
  publishedAt: string;
  readTimeInMinutes: number;
  content: {
    html: string;
  };
  tags?: Array<{
    name: string;
    slug: string;
  }>;
}

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  slug: string;
  content?: string;
}

// Replace with your Hashnode publication host (e.g., 'yourname.hashnode.dev')
const PUBLICATION_HOST = process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST || 'YOUR_PUBLICATION_HOST';

async function fetchHashnode(query: string, variables: Record<string, any> = {}) {
  const response = await fetch(HASHNODE_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    next: { revalidate: 3600 }, // Revalidate every hour
  });

  if (!response.ok) {
    throw new Error('Failed to fetch from Hashnode');
  }

  const json = await response.json();
  
  if (json.errors) {
    throw new Error(json.errors[0].message);
  }

  return json.data;
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const query = `
    query Publication($host: String!) {
      publication(host: $host) {
        posts(first: 20) {
          edges {
            node {
              id
              title
              brief
              slug
              coverImage {
                url
              }
              publishedAt
              readTimeInMinutes
              tags {
                name
                slug
              }
            }
          }
        }
      }
    }
  `;

  const data = await fetchHashnode(query, { host: PUBLICATION_HOST });
  
  const posts = data.publication.posts.edges.map((edge: any) => {
    const node = edge.node;
    return {
      id: node.id,
      title: node.title,
      description: node.brief,
      image: node.coverImage?.url || '/placeholder.svg?height=400&width=600',
      date: node.publishedAt,
      readTime: `${node.readTimeInMinutes} min read`,
      category: node.tags?.[0]?.name || 'Article',
      tags: node.tags?.map((tag: any) => tag.name) || [],
      slug: node.slug,
    };
  });

  return posts;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const query = `
    query Post($host: String!, $slug: String!) {
      publication(host: $host) {
        post(slug: $slug) {
          id
          title
          brief
          slug
          coverImage {
            url
          }
          publishedAt
          readTimeInMinutes
          content {
            html
          }
          tags {
            name
            slug
          }
        }
      }
    }
  `;

  const data = await fetchHashnode(query, { host: PUBLICATION_HOST, slug });
  
  if (!data.publication.post) {
    return null;
  }

  const post = data.publication.post;
  
  return {
    id: post.id,
    title: post.title,
    description: post.brief,
    image: post.coverImage?.url || '/placeholder.svg?height=600&width=1200',
    date: post.publishedAt,
    readTime: `${post.readTimeInMinutes} min read`,
    category: post.tags?.[0]?.name || 'Article',
    tags: post.tags?.map((tag: any) => tag.name) || [],
    slug: post.slug,
    content: post.content.html,
  };
}