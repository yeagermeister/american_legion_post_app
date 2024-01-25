import React, { useState, useEffect } from 'react'; 
import { Card, Col } from 'react-bootstrap';
import Collapsible from 'react-collapsible';

import CreateNews from '../components/news/createNews';
import EditNews from '../components/news/editNews';
import DeleteNews from '../components/news/deleteNews';

import { getNews } from '../utils/API';
import auth from '../utils/auth';

const News = () => {
  const [newsItems, setNewsItems] = useState([]);


  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await getNews();
        const data = await response.json();
        setNewsItems(data.news);
      } catch (err) {
        console.error(err);
      }
    };
    fetchNews(); 
  }, []);

  return (
    <>
      <h1>News</h1>
      {auth.isAdmin() && (  
        <Col w="100" md={6}>
          <Collapsible trigger="Submit a new article" className="h2" triggerOpenedClassName="h2">
            <CreateNews /> 
          </Collapsible>
        </Col> 
      )}
      <Col w={100} md={12}>
      {newsItems.length > 0 ? (
        newsItems.map((newsItem, index) => (
          <Card key={index}>
            <Card.Header>{new Date(newsItem.date).toLocaleDateString("en-US")}&nbsp;&nbsp;{newsItem.title}</Card.Header>
            <Card.Body>
              <Card.Text>{newsItem.summary}</Card.Text>
            </Card.Body>
            {auth.isAdmin() ? (
              <>
                <EditNews id={newsItem.id}/>
                <DeleteNews id={newsItem.id}/>
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