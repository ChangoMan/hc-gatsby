import React from "react"
import PropTypes from "prop-types"
import jsonp from "jsonp"

const getAjaxUrl = url => url.replace('/post?', '/post-json?')

class SubscribeForm extends React.Component {
  constructor(props, ...args) {
    super(props, ...args)
    this.state = {
      status: null,
      msg: null
    }
  }
  onSubmit = e => {
    e.preventDefault()
    if (!this.input.value || this.input.value.length < 5 || this.input.value.indexOf("@") === -1) {
      this.setState({
        status: "error"
      })
      return
    }
    const url = getAjaxUrl(this.props.action) + `&EMAIL=${encodeURIComponent(this.input.value)}`;
    this.setState(
      {
        status: "sending",
        msg: null
      }, () => jsonp(url, {
        param: "c"
      }, (err, data) => {
        if (err) {
          this.setState({
            status: 'error',
            msg: err
          })
        } else if (data.result !== 'success') {
          this.setState({
            status: 'error',
            msg: data.msg
          })
        } else {
          this.setState({
            status: 'success',
            msg: data.msg
          })
        }
      })
    )
  }
  render() {
    const { action, messages, className, style, styles } = this.props
    const { status, msg } = this.state
    return (
      <div className={className} style={style}>
        <form className="form-inline justify-content-center" action={action} method="post" noValidate>
            <input
                ref={node => (this.input = node)}
                type="email"
                defaultValue=""
                name="EMAIL"
                required={true}
                placeholder={messages.inputPlaceholder}
                className="form-control mr-3 mb-2 mb-lg-0"
            />
            <button
                className="btn btn-primary"
                disabled={this.state.status === "sending" || this.state.status === "success"}
                onClick={this.onSubmit}
                type="submit"
            >
              {messages.btnLabel}
            </button>
        </form>
        {status === "sending" && <div className="alert alert-secondary" dangerouslySetInnerHTML={{ __html: messages.sending }} />}
        {status === "success" && <div className="alert alert-success" dangerouslySetInnerHTML={{ __html: messages.success || msg }} />}
        {status === "error" && <div className="alert alert-warning" dangerouslySetInnerHTML={{ __html: msg || messages.error }} />}
      </div>
    )
  }
}

SubscribeForm.propTypes = {
  messages: PropTypes.object,
  styles: PropTypes.object
}

SubscribeForm.defaultProps = {
  messages: {
    inputPlaceholder: "Votre email",
    btnLabel: "Envoyer",
    sending: "Envoi en cours...",
    success: "Merci de votre intérêt!<p>Nous devons confirmer votre adresse e-mail. Pour compléter le processus d'abonnement, veuillez cliquer sur le lien contenu dans l'e-mail que nous venons de vous envoyer.</p>",
    error: "Please enter a valid email address."
  },
  styles: {
    sending: {
      fontSize: 18,
      color: "auto"
    },
    success: {
      fontSize: 18,
      color: "green"
    },
    error: {
      fontSize: 18,
      color: "red"
    }
  }
}

export default SubscribeForm