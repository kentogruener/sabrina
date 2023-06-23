import { useState } from 'react';
import { Button } from 'renderer/components/button/Button';
import Page from 'renderer/components/page/Page';

export default function SQLQuery() {
  const [query, setQuery] = useState<string>('');
  const [result, setResult] = useState<any[]>([]);

  async function runQuery() {
    const queryResult = await window.electron.query.run(query);
    setResult(queryResult);
  }

  return (
    <Page>
      <h1>SQL Query</h1>
      <textarea onChange={(evt) => setQuery(evt.target.value)} />
      <Button onClick={() => runQuery()}>Run</Button>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </Page>
  );
}
