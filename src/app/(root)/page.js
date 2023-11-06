import PostCard from "@/components/Shared/PostCard";

export default function Home() {
  return (
    <>
      {/* <h1 className="head-text text-left">Home</h1> */}
      <section className=" flex flex-col gap-10">
        <>
          <PostCard />
        </>
      </section>
    </>
    // <div className="flex flex-1">
    //   <div className="home-container">
    //     <div className="home-posts">
    //       <h2 className="h3-bold md:h2-bold text-left w-full text-light-1">home</h2>
    //       <ul className="flex flex-col flex-1 gap-9 w-full ">
    //         <li className="flex justify-center w-full">
    //           <PostCard />
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    // </div>
  );
}
