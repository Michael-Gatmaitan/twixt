import VisitUserPageContent from './VisitUserPageContent';

const page = ({ params }: { params: { userID: string } }) => {
  return (
    <main className="container">

      <VisitUserPageContent userID={params.userID} />
    </main>
  )
}

export default page
