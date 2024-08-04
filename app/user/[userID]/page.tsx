// import VisitUserPageContent from './VisitUserPageContent';

import UserContent from "../../components/user/[userID]/UserContent";

const page = ({ params }: { params: { userID: string } }) => {
  return (
    <main className="container">
      {/* <VisitUserPageContent userID={params.userID} /> */}
      <UserContent userID={params.userID} />
      This is a user page
    </main>
  );
};

export default page;
