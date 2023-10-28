import Image from "next/image";
import FormPost from "@/components/Form/PostForm";

export default function Post() {
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <Image src="/assets/create.svg" width={36} height={36} alt="post" />
          {/* <h2 className="h3-bold md:h2-bold text-light-1 text-left w-full">create post</h2> */}
        </div>
        <FormPost />
      </div>
    </div>
  );
}
