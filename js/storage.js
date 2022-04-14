let serverAPIKey, serverPort, serverIp, serverProtocol, serverPath, origin, userId;


function pullStoredData(callback) {
    chrome.storage.sync.get(['serverAPIKey', 'serverIp', 'serverPort', 'serverProtocol', 'serverPath', 'userId'], function(data) {
        serverAPIKey = data.serverAPIKey || '';
        serverIp = data.serverIp || '172.0.0.1';
        serverPort = data.serverPort || 8001;
        serverProtocol = data.serverProtocol || 'http';
        serverPath = data.serverPath || '/'
        origin = `${serverProtocol}://${serverIp}:${serverPort}${serverPath}`;
        if (origin.endsWith('/')) {
            origin = origin.slice(0, origin.length - 1);
        }
        userId = data.userId || undefined;
        if (callback) callback(data);
    });
}

function isLoggedIn(callback) {
    getLoggedUser(function(success, errorMsg, response) {
        userId = success ? response.id : null;
        chrome.storage.sync.set({
            userId: userId
        });
        if (callback) callback(success, userId);
    });
}

function setOrigin(apiKey, ip, port, protocol, path, callback) {
    serverAPIKey = apiKey;
    serverIp = ip;
    serverPort = port;
    serverProtocol = protocol;
    serverPath = path;
    origin = `${serverProtocol}://${serverIp}:${serverPort}${serverPath}`;
    if (origin.endsWith('/')) {
        origin = origin.slice(0, origin.length - 1);
    }
    chrome.storage.sync.set({
        serverAPIKey: serverAPIKey,
        serverIp: serverIp,
        serverPort: serverPort,
        serverProtocol: serverProtocol,
        serverPath: serverPath
    }, function () {
        if (callback) callback();
    });
}
