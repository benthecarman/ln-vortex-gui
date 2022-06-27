import useSWR from 'swr';
import Channel from '../components/Channel';
import { useRouter } from 'next/router';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Index() {
  const { data: channelData, error } = useSWR('/api/channels', fetcher);
  const router = useRouter();

  if (error) return <div>Failed to load</div>;
  if (!channelData) return <div>Loading...</div>;

  return (
    <>
      <h2>Channels</h2>
      <ul className="scrollable">
        {channelData.map((c, i) => (
          <>
            <Channel key={i} channel={c} />
          </>
        ))}
      </ul>
      <button
        onClick={() => {
          router.push('/create');
        }}
      >
        CREATE NEW CHANNEL
      </button>
    </>
  );
}