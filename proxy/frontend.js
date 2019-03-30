import { remote } from 'electron';

/*
* partition - это имя webview. По нему всегда можно получить текущую сессию из любого места приложения
* setProxy - метод для установки прокси.
*/

const webviewName = 'persist:webviewsession';

class Player extends Component {
    render() {
      console.log("player");
      return (
        <div className="player">
          <ElectronWebView src={this.state.deploymentUrl} partition={webviewName}  />
        </div>
      );
    }

    setProxy(host, port){
        return new Promise((resolve, reject) => {
            if(proxy && proxy.ip){
                const proxyUrl = `http://${host}:${port}`;
                remote.session.fromPartition(webviewName).setProxy({proxyRules:proxyUrl, pacScript:null, proxyBypassRules:null}, ()=>{
                    resolve();
                });
            } else {
                resolve();
            }
        })
    }
  }