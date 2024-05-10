import { db } from "~/server/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });

  return (
    <main className="p-2">
      <div className="flex flex-wrap gap-4">
        {[...images, ...images, ...images].map((image, index) => (
          <div
            className="flex w-48 flex-col items-center gap-2 "
            key={image.id + 1 + "" + index * 3}
          >
            <div className="">{image.name}</div>
            <img alt="image" className="" src={image.url} />
          </div>
        ))}
      </div>
    </main>
  );
}
