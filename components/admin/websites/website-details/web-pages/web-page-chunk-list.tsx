import { PuzzlePieceIcon } from '@heroicons/react/24/outline';

interface WebPageChunkListProps {
  webPageChunks: {
    content: string;
    fromLine: number;
    toLine: number;
  }[];
}

export default async function WebPageChunkList({ webPageChunks }: WebPageChunkListProps) {
  return (
    <div className="card bg-base-100">
      <div className="card-body">
        <h2 className="card-title">
          <PuzzlePieceIcon className="size-6"/>
          Web Page Chunks
        </h2>
        <table className="table table-bordered table-zebra">
          <thead>
          <tr>
            <th>Content</th>
            <th>From</th>
            <th>To</th>
          </tr>
          </thead>
          <tbody>
          {
            webPageChunks.map(({ toLine, fromLine, content }) => (
              <tr key={ fromLine + ':' + toLine + content.substring(0, 10) }>
                <td className='break-all'>{ content }</td>
                <td>{ fromLine }</td>
                <td>{ toLine }</td>
              </tr>
            ))
          }
          </tbody>
        </table>
      </div>
    </div>
  );
}
