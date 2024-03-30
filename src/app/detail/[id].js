export async function getServerSideProps(context) {
    const { id } = context.params;
    const res = await fetch(`http://localhost:8000/api/detail/${id}`);
    const data = await res.json();
   
    return {
    props: {
      data,
    },
    };
   }
   
   function Detail({ data }) {
    return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
    </div>
    );
   }