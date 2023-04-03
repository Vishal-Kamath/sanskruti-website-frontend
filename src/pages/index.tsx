import SideBar from '@/components/sidebar/sidebar';

export default function Home() {
  return (
    <main className="relative flex min-h-screen">
      <SideBar />
      <div className="padding-r h-full min-h-screen w-full pt-20 max-md:pl-[4vw] md:pl-5"></div>
    </main>
  );
}
