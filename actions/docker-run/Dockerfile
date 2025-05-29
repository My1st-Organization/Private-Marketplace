FROM docker:20.10

RUN apk add bash

RUN apk add build-base

COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
