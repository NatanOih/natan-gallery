import Link from "next/link";
import { db } from "~/server/db";

const mockUrls = [
  "https://images.unsplash.com/photo-1715292779491-a32d1f086f5a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8",
  "https://plus.unsplash.com/premium_photo-1669048776605-28ea2e52ae66?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8",
  "https://images.unsplash.com/photo-1715320555601-75fe531bfefe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1715144536780-c847096a8632?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D",
];

const mockIUmages = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}));

export default async function HomePage() {
  const posts = await db.query.posts.findMany();

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {posts.map((post) => (
          <div key={post.id}>{post.name}</div>
        ))}
        {[...mockIUmages, ...mockIUmages, ...mockIUmages].map(
          (image, index) => (
            <div className="w-48 " key={image.id + 1 + "" + index * 3}>
              <img alt="image" className="" src={image.url} />
            </div>
          ),
        )}
      </div>
    </main>
  );
}
