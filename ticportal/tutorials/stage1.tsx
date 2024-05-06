"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import "./styles.css"

type ArticleData = {
  body_html: string;
};

const Stage1 = () => {
  const [articleData, setArticleData] = useState<ArticleData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ArticleData>(
          'https://dev.to/api/articles/ticfoundation/stage-one-40a8'
        );

        

        setArticleData(response.data);
      } catch (error:any) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='bg-red-200 w-[200px]' >
      {articleData ? (
        <div dangerouslySetInnerHTML={{ __html: articleData.body_html }} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Stage1;