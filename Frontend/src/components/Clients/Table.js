import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { actions } from '../../redux/actions'
import { FaSort } from "react-icons/fa";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./tableStyle.js";
import { withRouter } from "react-router-dom";
import { Table } from 'react-bootstrap';

export default (withRouter(function CustomTable(props) {
  const client = useSelector(state =>
    state.clientReducer.client
  );
  const dispatch = useDispatch();

  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const { tableData } = props;
  const useSortableData = (items, config = null) => {
    const [sortConfig, setSortConfig] = React.useState(config);

    const sortedItems = React.useMemo(() => {
      let sortableItems = [...items];
      if (sortConfig !== null) {
        sortableItems.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        });
      }
      return sortableItems;
    }, [items, sortConfig]);

    const requestSort = (key) => {

      let direction = 'ascending';
      if (
        sortConfig &&
        sortConfig.key === key &&
        sortConfig.direction === 'ascending'
      ) {
        direction = 'descending';
      }
      setSortConfig({ key, direction });
    };

    return { items: sortedItems, requestSort, sortConfig };
  };

  const { items, requestSort, sortConfig } = useSortableData(tableData);

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };



  function clickRow(value) {   
    props.history.push("/admin/clients/" + value._id);     
    dispatch(actions.setClient(value));

  }
  return (

    <div className={classes.tableResponsive}>

      <Table  >
        <thead>
          <tr>
            <th className={getClassNamesFor('first_name ')}>
              {"First name  "}
              <FaSort onClick={() => requestSort('first_name')} />
            </th>

            <th className={getClassNamesFor('last_name')}>
              {"Last name  "}
              <FaSort onClick={() => requestSort('last_name')} />
            </th>


            <th className={getClassNamesFor('gender')}>
              {"Gender "}
              <FaSort onClick={() => requestSort('gender')} />
            </th>
            <th>
              {"email"}
            </th>


          </tr>
        </thead>

        <tbody>

          {items.map((prop, key) => {

            return (
              <tr key={key} className={classes.tableBodyRow} onClick={() => clickRow(prop)}>
                {
                  [prop.first_name, prop.last_name, prop.gender, prop.email, prop.phone_number].map((prop, key) => {

                    return (
                      <td className={classes.tableCell} key={key}>
                        {prop}
                      </td>
                    );
                  })}
              </tr>
            );
          })}



        </tbody>
      </Table>

    </div>

  );



}));