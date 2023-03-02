import { AuthMenu } from "@/components/AuthMenu";
import { Layout } from "@/components/Layout";
import { QrCodeReader } from "@/components/QrCodeReader";
import { SongPlayer } from "@/components/SongPlayer";
import { NextPage } from "next";
import { useState } from "react";

const KidsApp: NextPage = () => {
  const [songUrl, setSongUrl] = useState<string | undefined>(undefined)

  const onDecode = (data: string) => {
    // TODO: check if data is a valid spotify url
    setSongUrl(data)
  }

  return (
    <Layout title="Kids App">
      <AuthMenu /><br />
      <SongPlayer url={songUrl} />
      <QrCodeReader onDecode={onDecode} />
    </Layout>
  );
};

export default KidsApp;
