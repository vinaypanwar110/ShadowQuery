import { useState } from "react";
import { queries, queryDataMap } from "./utils";
import "./App.css";

export default function SQLQueryViewer() {
  const [selectedQuery, setSelectedQuery] = useState(queries[0]);
  const [compareQuery, setCompareQuery] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const relatedQueries = queries.filter(q => q.table === selectedQuery.table && q.id !== selectedQuery.id);

  const handleRunQuery = () => {
    setShowTable(true);
  };

  function getColumnDifferences(query1, query2) {
    const query1Cols = new Set(query1.columns);
    const query2Cols = new Set(query2.columns);
    return {
      removed: query1.columns.filter(col => !query2Cols.has(col)),
      added: query2.columns.filter(col => !query1Cols.has(col))
    };
  }

  const sortedData = [...queryDataMap[selectedQuery.id]].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const valA = a[sortConfig.key];
    const valB = b[sortConfig.key];
    return valA < valB ? (sortConfig.direction === "asc" ? -1 : 1) : valA > valB ? (sortConfig.direction === "asc" ? 1 : -1) : 0;
  });

  const filteredData = sortedData.filter(row =>
    Object.values(row).some(value =>
      value.toString().toLowerCase().includes(filterText.toLowerCase())
    )
  );

  const exportData = (format) => {
    const dataToExport = compareQuery
      ? filteredData.map(row => {
          let newRow = {};
          selectedQuery.columns.forEach(col => newRow[col] = row[col]);
          compareQuery.columns.filter(col => !selectedQuery.columns.includes(col)).forEach(col => newRow[col] = queryDataMap[compareQuery.id][row.id]?.[col] || "");
          return newRow;
        })
      : filteredData;

    if (format === "csv") {
      const headers = compareQuery ? [...selectedQuery.columns, ...compareQuery.columns.filter(col => !selectedQuery.columns.includes(col))] : selectedQuery.columns;
      const csvRows = [headers.join(",")];
      dataToExport.forEach(row => csvRows.push(headers.map(col => row[col] || "").join(",")));
      const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "query_result.csv";
      a.click();
    } else if (format === "json") {
      const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "query_result.json";
      a.click();
    }
  };

  return (
    <div className="sql-query-viewer">
      <div className="query-container">
        <h2>SQL Query Viewer</h2>
        <select value={selectedQuery.id} onChange={(e) => {
          setSelectedQuery(queries.find(q => q.id === Number(e.target.value)));
          setCompareQuery(null);
          setShowTable(false);
        }} className="query-select">
          {queries.map(q => <option key={q.id} value={q.id}>{q.query}</option>)}
        </select>
        <select value={compareQuery ? compareQuery.id : ""} onChange={(e) => {
          setCompareQuery(queries.find(q => q.id === Number(e.target.value)));
          setShowTable(false);
        }} className="query-select">
          <option value="">Compare with another query...</option>
          {relatedQueries.map(q => <option key={q.id} value={q.id}>{q.query}</option>)}
        </select>
        <button className="run-button" onClick={handleRunQuery} title={compareQuery ? "Green = Added, Red = Removed" : ""}>
          {compareQuery ? "Compare Queries" : "Run Query"}
        </button>
      </div>

      {showTable && (
        <div className="table-container">
          <input type="text" className="filter-input" placeholder="Filter results..." value={filterText} onChange={(e) => setFilterText(e.target.value)} />
          <div className="export-buttons">
            <button onClick={() => exportData("csv")}>Export as CSV</button>
            <button onClick={() => exportData("json")}>Export as JSON</button>
          </div>

          {compareQuery ? (
            <>
              <h3>Comparison Result</h3>
              <table>
                <thead>
                  <tr>
                    {selectedQuery.columns.map((key) => {
                      const { removed, added } = getColumnDifferences(selectedQuery, compareQuery);
                      return <th key={key} className={removed.includes(key) ? "highlight-removed" : ""}>{key}</th>;
                    })}
                    {compareQuery.columns.filter(col => !selectedQuery.columns.includes(col)).map((key) => (
                      <th key={key} className="highlight-added">{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((row, index) => (
                    <tr key={index}>
                      {selectedQuery.columns.map((col, i) => (
                        <td key={i} className={getColumnDifferences(selectedQuery, compareQuery).removed.includes(col) ? "highlight-removed" : ""}>{row[col]}</td>
                      ))}
                      {compareQuery.columns.filter(col => !selectedQuery.columns.includes(col)).map((col, i) => (
                        <td key={i} className="highlight-added">{queryDataMap[compareQuery.id][index]?.[col] || ""}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <>
              <h3>Query Result</h3>
              <table>
                <thead>
                  <tr>
                    {selectedQuery.columns.map((key) => <th key={key}>{key}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((row, index) => (
                    <tr key={index}>
                      {selectedQuery.columns.map((col, i) => <td key={i}>{row[col]}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      )}
    </div>
  );
}
