import React, { useEffect } from 'react';

const ConnectApi = () => {

  const [ cardsTarot, setCardsTarot ] = useState([]);
  const [ pathImg, setPathImg] = useState("");
  const [ pathImgBack, setPathImgBack] = useState("");  

  useEffect(() => {
    api.ConnectApi()
    .then(response => {
      if( response.status === 200 ){
        setCardsTarot([...response.data.cards, response.data]);
        setPathImg(response.data.imagesUrl);
        setPathImgBack(response.data.imageBackCard);
      }
  })
    .catch( error => console.log( error) )
  }, [])  

}

export default ConnectApi;