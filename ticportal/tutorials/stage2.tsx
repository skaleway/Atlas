"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';

type ArticleData = {
  body_html: string;
};

const Stage2 = () => {
  const [articleData, setArticleData] = useState<ArticleData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ArticleData>(
          'https://dev.to/api/articles/ticfoundation/stage-two-4ieb'
        );

        setArticleData(response.data);
      } catch (error:any) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {articleData ? (
        <div dangerouslySetInnerHTML={{ __html: articleData.body_html }} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Stage2;