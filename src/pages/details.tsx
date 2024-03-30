import { Helmet } from 'react-helmet-async';
//routes
import { useParams } from 'src/routes/hooks';
// sections
import { DetailsView } from 'src/sections/details/view';

// ----------------------------------------------------------------------

export default function DetailView() {
  const params = useParams();

  const { id } = params;
  console.log(id, typeof(id))
  return (
    <>
      <Helmet>
        <title> Details View</title>
      </Helmet>

      <DetailsView id={`${id}`}/>
    </>
  );
}
