import { connect } from 'react-redux'
import {
  hideModal,
  showBidirectionalSignatureImporter,
  cancelBidirectionalTransaction,
} from '../../../../store/actions'
import BidirectionalTransactionDisplay from './bidirectional-transaction-display.component'

const mapStateToProps = (state) => {
  return {
    transactionData: state.metamask.signPayload,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    hideModal: () => dispatch(hideModal()),
    showBidirectionalSignatureImporter: () =>
      dispatch(showBidirectionalSignatureImporter()),
    cancelTransaction: () => dispatch(cancelBidirectionalTransaction()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BidirectionalTransactionDisplay)
