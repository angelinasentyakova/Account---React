import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import Pagination from "../../Common/Pagination/Pagination";
import Preloader from "../../Common/Preloader/Preloader";
import { withAuthRedirect } from "../../HOC/withAuthRedirect";
import { getTransactionsDataThunkCreator } from "../../Redux/transactionsReducer";
import "./Transactions.css";

const Transactions = (props) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(4);

  useEffect(() => {
    props.getTransactionsData();
  }, []);
  
  const lastTransactionIndex = currentPage * itemsPerPage;
  const firstTransactionIndex = lastTransactionIndex - itemsPerPage;
  const currentTransactions = props.transactions.slice(firstTransactionIndex, lastTransactionIndex);

  const paginate = currentPage => {
    setCurrentPage(currentPage)
  }

    return (
      <div>
        {props.isFetching ? <Preloader /> : null}
        <div className="tr-wrapper">
          <div className="tr-balance-wrapper">
            <div className="tr-balance-title">Текущий баланс:</div>
            <div className="tr-balance-value">{props.currentBalance}</div>
          </div>
          <div className="tr-list-wrapper">
            <Pagination totalItemsCount={props.transactions.length} pageSize={itemsPerPage} Paginate={paginate} currentPage={currentPage}/>
            <div className="tr-list-title">Операции</div>
            <ul className="tr-list-items">
              {currentTransactions.map((transaction, index) => (
                <li key={index} className="tr-list-column">
                  <div className="tr-list-item">
                    <div className="tr-list-item-name">{transaction.title}</div>
                    <div className="tr-list-item-date">
                      {transaction.datetime.substr(0, 19).split("T").join(" ")}
                    </div>
                    <div
                      className={`tr-list-item-amount ${
                        transaction.direction === "in"
                          ? "green "
                          : transaction.direction === "out"
                          ? "red"
                          : ""
                      }`}
                    >
                      {transaction.direction === "in"
                        ? "+ "
                        : transaction.direction === "out"
                        ? "- "
                        : "---"}
                      {transaction.amount + " RUB"}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

let mapStateToProps = (state) => ({
  currentBalance: state.transactions.currentBalance,
  transactions: state.transactions.transactionsData,
  isFetching: state.transactions.isFetching,
});

export default compose(
  connect(mapStateToProps, {
    getTransactionsData: getTransactionsDataThunkCreator,
  }),
  withAuthRedirect
)(Transactions);
