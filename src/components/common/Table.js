import React from 'react'

import '../../styles/tables.css'

const Table = ({ headers = [], data = [], title = 'Result' }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          {headers.map((header, i) => (
            <td key={i}>{header.toUpperCase()}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? data.map((row, i) => (
          <tr key={i}>
            {row.map((item, j) => (
              <td
                className={(item === "Credit" || item === "Debit") ? "icon-td" : ""}
                key={j}
              >
                {item === 'Debit'
                  ? <span className="dot red-dot"/> 
                  : (item === 'Credit' 
                    ? <span className="dot green-dot"/>
                    : <span>{item}</span>
                  )
                }
              </td>
            ))}
          </tr>
        )) : headers.length > 0 && (
          <tr>
            <td
              style={{ textAlign: 'center' }}
              colSpan={headers.length}
            >No {title}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default Table;
