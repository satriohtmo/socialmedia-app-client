import ProfileHeader from "@/components/Shared/ProfileHeader";
import Image from "next/image";
import { Tabs, Tabscontent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";

export default function User() {
  return (
    <section>
      <ProfileHeader />
      <div className="mt-9">
        <Tabs defaultValue="threads" className="w-full">
          <TabsList className="tab">
            {profileTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className="tab">
                <Image src={tab.icon} alt={tab.label} width={24} height={24} className="object-contain" />
                <p className="max-sm:hidden">{tab.label}</p>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </section>
  );
}