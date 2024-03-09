import PageContent from './PageContent';

const page = ({ params }: { params: { userID: string } }) => {
  return (
    <main className="container">

      <PageContent params={params} />
    </main>
  )
}

export default page
