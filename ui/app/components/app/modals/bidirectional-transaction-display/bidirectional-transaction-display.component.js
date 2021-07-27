import React, { Component } from 'react'
import PropTypes from 'prop-types'
import QRCode from 'qrcode.react'
import Button from '../../../ui/button'
import { UR, UREncoder } from '@ngraveio/bc-ur'

export default class BidirectionalTransactionDisplay extends Component {
  static propTypes = {
    transactionData: PropTypes.object.isRequired,
    hideModal: PropTypes.func,
    cancelTransaction: PropTypes.func,
    showBidirectionalSignatureImporter: PropTypes.func.isRequired,
  }

  static contextTypes = {
    t: PropTypes.func,
  }

  constructor(props) {
    super(props)
    const { transactionData } = props
    const { payload } = transactionData
    const ur = new UR(Buffer.from(payload.cbor, 'hex'), payload.type)
    const urEncoder = new UREncoder(ur, 400)
    this.state = {
      currentQRCode: urEncoder.nextPart(),
      urEncoder,
    }
  }

  componentDidMount() {
    setInterval(() => {
      this.setState((state) => {
        const { urEncoder } = state
        return {
          currentQRCode: urEncoder.nextPart(),
        }
      })
    }, 100)
  }

  handleCancel() {
    const { hideModal, cancelTransaction } = this.props
    cancelTransaction()
    hideModal()
  }

  render() {
    const { currentQRCode } = this.state
    const { showBidirectionalSignatureImporter } = this.props

    return (
      <div className="qr-scanner">
        <div className="qr-scanner__title">
          <p>{this.context.t('scanWithCoboVault')}</p>
        </div>
        <div
          className="qr-scanner__content"
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            marginBottom: 20,
          }}
        >
          <QRCode value={currentQRCode.toUpperCase()} size={250} />
        </div>
        <div style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 20 }}>
          {this.context.t('scanCoboDescription')}
        </div>
        <div style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 20 }}>
          {this.context.t('keystoneVersion')}
        </div>
        <div className="bidirectional-transaction-display__button-group">
          <Button
            className="bidirectional-transaction-display__button"
            type="default"
            onClick={() => {
              this.handleCancel()
            }}
          >
            {this.context.t('cancelTransaction')}
          </Button>
          <Button
            className="bidirectional-transaction-display__button"
            type="primary"
            onClick={showBidirectionalSignatureImporter}
          >
            {this.context.t('getSignatureFromCoboVault')}
          </Button>
        </div>
      </div>
    )
  }
}
