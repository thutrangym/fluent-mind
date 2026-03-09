import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth-options";

import CommunityHeader from "@/src/components/community/community-header";
import CreatePost from "@/src/components/community/create-post";
import PostList from "@/src/components/community/post-list";

export default async function CommunityPage() {

  const session = await getServerSession(authOptions);

  const userId = session?.user?.id;

  return (
    <main className="bg-[#FAFFF6]">
    <div className="max-w-2xl  mx-auto p-6 space-y-6">

      <CommunityHeader />

      <CreatePost userId={userId} />

      <PostList />

    </div>

    </main>
  );
}