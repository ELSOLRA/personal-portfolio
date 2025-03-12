import { getAbout } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";

export default async function AboutTestPage() {
  const about = await getAbout();
  console.log("about--------", about);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">About Data Test</h1>

      {about ? (
        <div className="mt-8">
          <h2 className="text-xl font-semibold">{about.name}</h2>
          <p className="text-gray-600">{about.role}</p>

          {about.profileImage && (
            <div className="my-4">
              <Image
                src={urlForImage(about.profileImage).url()}
                alt={about.name}
                width={200}
                height={200}
                className="rounded-full"
              />
            </div>
          )}

          {about.shortBio && (
            <div className="my-4">
              <h3 className="font-medium">Bio</h3>
              <p>{about.shortBio}</p>
            </div>
          )}
          <h1>Json object</h1>
          <div className="bg-gray-100 p-4 rounded-lg">
            <pre className="text-sm overflow-x-auto text-black">
              {JSON.stringify(about, null, 2)}
            </pre>
          </div>
        </div>
      ) : (
        <p className="mt-4 text-red-500">
          No about data found. Add some in your Sanity studio.
        </p>
      )}
    </div>
  );
}
