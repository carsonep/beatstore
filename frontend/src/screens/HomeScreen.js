import React, { useState, useEffect } from "react";

import { Container } from "react-bootstrap";
import axios from "axios";
import Waveform from "../components/Waveform";
import BeatList from "../components/BeatList";

function HomeScreen({ match }) {
  const [selectedTrack, setSelectedTrack] = useState(`/api/products/1`);

  useEffect(() => {
    async function fetchBeat() {
      const { data } = await axios.get(`/api/products/1`);
      setSelectedTrack(data.beat);
    }
    fetchBeat();
  }, []);

  return (
    <Container>
      <Waveform url={`${selectedTrack}`} />
      <BeatList
        selectedTrack={selectedTrack}
        setSelectedTrack={setSelectedTrack}
      />
    </Container>
  );
}

export default HomeScreen;
