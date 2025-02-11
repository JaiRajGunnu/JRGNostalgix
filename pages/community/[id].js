import { useRouter } from "next/router";
import friends from "../../data/friends.json";

const CommunityPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const friend = friends.find((f) => f.id.toString() === id);

  if (!friend) {
    return <h1>404 - Friend Not Found</h1>;
  }

  return (
    <div>
      <h1>{friend.name}</h1>
      <p>{friend.quote}</p>
    </div>
  );
};

export default CommunityPage;
