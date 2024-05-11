import { IUserWOPassword } from '@/app';
import { timeDistance } from '@/lib/time_formatters/timeDistance';

const MeContent = async (props: { me: IUserWOPassword }) => {
  const { me } = props;
  const accountCreated = timeDistance(me.createdAt);

  return (
    <div>
      <div className="text-4xl">
        <p>{me.username}</p>
        <p>{me._id}</p>
        <p>{accountCreated}</p>
        <p>{me.bio}</p>
        <p>{me.status}</p>
      </div>
    </div>
  )
}

export default MeContent
