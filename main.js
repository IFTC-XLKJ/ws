async function handleRequest(request) {
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  console.log('Origin:', origin);
  console.log('Referer:', referer);
  if (isAprilFoolsDay()) {
    return new Response("418 - I'm a teapot", { status: 418 })
  }
  const url = new URL(request.url);
  const staticFilePath = './static' + (url.pathname.startsWith('/static') ? url.pathname.slice(7) : url.pathname);
  const pathname = url.pathname;
  const pathnames = pathname.split('/');
  if (pathname === "/") {
    try {
      const params = {}
      const content = await mixed("pages/index.html", params);
      return new Response(content, {
        headers: {
          "Content-Type": "text/html",
        },
      });
    } catch (error) {
      console.error(error);
      return new Response("Internal Server Error", { status: 500 });
    }
  }
  return new Response("404 Not Found", { status: 404 });
}
Deno.serve(handleRequest);
addEventListener("error", (event) => {
  console.error(event.error);
});

async function mixed(filepath, params) {
  try {
    let content = await Deno.readTextFile(filepath);
    const keys = Object.keys(params);
    console.log(keys);
    keys.forEach((key) => {
      const regex = new RegExp(`{{${key}}}`, "g");
      content = content.replace(regex, params[key]);
    });
    return content;
  } catch (error) {
    throw error;
  }
}

function time() {
  return Date.now();
}

function isAprilFoolsDay() {
  const now = new Date();
  return now.getMonth() === 3 && now.getDate() === 1;
}

function getContentType(extension) {
  if (extension === ".html") {
    return "text/html; charset=utf-8";
  } else if (extension === ".css") {
    return "text/css; charset=utf-8";
  } else if (extension === ".js") {
    return "text/javascript; charset=utf-8";
  } else if (extension === ".json") {
    return "application/json; charset=utf-8";
  } else if (extension === ".png") {
    return "image/png";
  } else if (extension === ".jpg") {
    return "image/jpeg";
  } else if (extension === ".ico") {
    return "image/x-icon";
  } else if (extension === ".svg") {
    return "image/svg+xml";
  } else if (extension === ".woff") {
    return "font/woff";
  } else if (extension === ".woff2") {
    return "font/woff2";
  } else if (extension === ".ttf") {
    return "font/ttf";
  } else if (extension === ".eot") {
    return "application/vnd.ms-fontobject";
  } else if (extension === ".otf") {
    return "font/otf";
  } else if (extension === ".wasm") {
    return "application/wasm";
  } else if (extension === ".pdf") {
    return "application/pdf";
  } else if (extension === ".txt") {
    return "text/plain; charset=utf-8";
  } else if (extension === ".md") {
    return "text/markdown; charset=utf-8";
  } else if (extension === ".xml") {
    return "application/xml; charset=utf-8";
  } else if (extension === ".csv") {
    return "text/csv; charset=utf-8";
  } else if (extension === ".tsv") {
    return "text/tab-separated-values; charset=utf-8";
  } else if (extension === ".mp3") {
    return "audio/mpeg";
  } else if (extension === ".mp4") {
    return "video/mp4";
  } else if (extension === ".mpeg") {
    return "video/mpeg";
  } else if (extension === ".webm") {
    return "video/webm";
  } else if (extension === ".ogg") {
    return "audio/ogg";
  } else if (extension === ".wav") {
    return "audio/wav";
  } else if (extension === ".exe") {
    return "application/octet-stream";
  }
  return "application/octet-stream";
}

console.log(globalThis);