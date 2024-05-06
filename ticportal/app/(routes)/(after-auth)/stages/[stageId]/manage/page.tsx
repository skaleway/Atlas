import AdminForm from "@/components/stages/Quiz";



const Page = async ({ params }: { params: { stageId: string }}) => {

  console.log("stageId here", params.stageId);
  if (!params.stageId) {
    return <div>Invalid stage</div>;
  }

  
  return (
    <div className="">
      <AdminForm stageId={params.stageId} />
    </div>
  );
};

export default Page;