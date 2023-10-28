import Link from "next/link";

export default function Rightsidebar() {
  return (
    <section className="custom-scrollbar rightsidebar">
      <div className="flex flex-1 w-full flex-col justify-start">
        <h3 className="text-heading-4-medium text-light-1">Profile</h3>
        <Link href="/user/1" className="flex gap-3 items-center">
          <img src="/assets/profile-placeholder.svg" alt="profile" className="h-14 w-14 rounded-full" />
          <div className="flex flex-col">
            <p className="body-bold text-light-1">satriohutomo</p>
            <p className="small-regular text-gray-1">@user</p>
          </div>
        </Link>
      </div>
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading-4-medium text-light-1">Suggested User</h3>
      </div>
    </section>
  );
}
