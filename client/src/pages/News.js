import React, { useContext, useEffect, useState } from 'react'; 
import { Card, Col } from 'react-bootstrap';
import Collapsible from 'react-collapsible';

import CreateNews from '../components/news/createNews';
import DeleteNews from '../components/news/deleteNews';
import EditNews from '../components/news/editNews';

import { getNews } from '../utils/API';
import { AuthContext } from "../utils/authContext";

const News = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [collapsibleKey, setCollapsibleKey] = useState(0);
  const { admin }= useContext(AuthContext);

  const fetchNews = async () => {
    try {
      const response = await getNews();
      setNewsItems(response.data.news);
    } catch (err) {
      console.error(err);
    }
  };

  const handleNewsUpdate = () => {
    fetchNews();
    setCollapsibleKey(prevKey => prevKey + 1); // Increment key to force Collapsible to close
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <>
      <h1>News</h1>
      {admin && (  
        <Col w="100" md={6}>
          <Collapsible 
            key={collapsibleKey}
            trigger="Submit a new article" 
            className="h2" 
            triggerOpenedClassName="h2"
          >
            <CreateNews onNewsUpdate={handleNewsUpdate}/> 
          </Collapsible>
        </Col> 
      )}
      <Col md={4} className='blueContainer'>
      {newsItems.length > 0 ? (
        newsItems.map((newsItem, index) => (
          <Card key={index} className='myContainer'>
            <Card.Header className='redContainer'>{new Date(newsItem.date).toLocaleDateString("en-US")}&nbsp;&nbsp;{newsItem.title}</Card.Header>
            <Card.Body>
              <Card.Text>{newsItem.summary}</Card.Text>
            </Card.Body>
            {admin ? (
              <>
                <EditNews id={newsItem.id} onNewsUpdate={handleNewsUpdate}/>
                <DeleteNews id={newsItem.id} onNewsUpdate={handleNewsUpdate}/>
              </>
              ) : null
            }
          </Card>          
        ))
      ) : (
        <h3>No News Items Yet</h3>
      )}
      </Col>
    </>
  )
};

export default News;