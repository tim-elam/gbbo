import axios from 'axios';

export async function getMarkdownContent(url: string) {
  try {
    const { data } = await axios.get(`https://r.jina.ai/${ url }`);
    return data as string;
  }
  catch (error) {
    console.error('Error retrieving markdown content!', error);
    return null;
  }
}
