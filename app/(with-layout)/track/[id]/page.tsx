interface Props {
  params: {
    id: string;
  };
}

const TrackPage = async ({ params }: Props) => {
  const { id } = await params;

  console.log("TrackPage", id);

  if (!id) {
    return <div>No id...</div>;
  }

  return <>hello</>;
};

export default TrackPage;
