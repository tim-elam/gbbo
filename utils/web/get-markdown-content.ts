import axios from 'axios';

export async function getMarkdownContent(url: string) {
  try {
    const { data } = await axios.get(`https://r.jina.ai/${ url }`);
    return data;
  }
  catch (error) {
    console.error('Error retrieving markdown content!', error);
  }
}
