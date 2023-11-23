import Image from "next/image";
import FormPost from "@/components/Form/PostForm";

export default function Post() {
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <Image src="/assets/create.svg" width={36} height={36} alt="post" />
        </div>
        <FormPost />
      </div>
    </div>
  );
}
