import PropTypes from 'prop-types';

const Table = ({ headers, data }) => {
  const tableStyles = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  };

  const thStyles = {
    padding: '10px',
    textAlign: 'left',
    backgroundColor: '#f2f2f2',
    borderBottom: '2px solid #ddd',
  };

  const tdStyles = {
    padding: '10px',
    borderBottom: '1px solid #ddd',
  };

  return (
    <table style={tableStyles}>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index} style={thStyles}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} style={tdStyles}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default Table;
