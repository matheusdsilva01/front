import { Grid } from "@mui/material";
import Card from "dh-marvel/components/card/card";
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import { getComics } from "dh-marvel/services/marvel/marvel.service";
import { GetServerSideProps } from "next";
import Head from "next/head";

interface homeProps {
  comics: Comic[];
}

interface Comic {
  id: number;
  title: string;
  thumbnail: {
    path: string;
    extension: string;
  }
}

const Index = ({ comics }: homeProps) => {

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BodySingle title={"Sample"}>
        <Grid container justifyContent="center" spacing={2}>
          {comics &&
            comics.map((comic) => (
              <Grid item key={comic.id}>
                <Card
                  id={comic.id}
                  title={comic.title}
                  imgSrc={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                />
              </Grid>
            ))}
        </Grid>
      </BodySingle>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await getComics(12, 12);
  const comics = data.data.results.map(({ title, id, thumbnail }: Comic) => {
    return { title, id, thumbnail };
  });

  return {
    props: {
      comics
    }
  };
};

export default Index;