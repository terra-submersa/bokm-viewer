# bokm viewer




## The viewer

Basic vue 3 + vite project

# Docker deployment

On Mac, you eventually need this one to be able to xbuild

    docker buildx create \
            --name container-builder \
            --driver docker-container \
            --use --bootstrap


    bokm_version=0.1
    npm run build && docker build --platform linux/amd64,linux/arm64  -t alexmass/bokm-viewer:$bokm_version -t alexmass/bokm-viewer:lastest .
    docker push alexmass/bokm-viewer:$bokm_version
    docker push alexmass/bokm-viewer:latest

    cd dockers/mbtileserver
    docker build --platform linux/amd64,linux/arm64  -t alexmass/bokm-mbtileserver:$bokm_version -t alexmass/bokm-mbtileserver:latest .
    docker push alexmass/bokm-mbtileserver:$bokm_version
    docker push alexmass/bokm-mbtileserver:latest
    cd -

    cd dockers/nginx
    docker build --platform linux/amd64,linux/arm64  -t alexmass/bokm-nginx:$bokm_version -t alexmass/bokm-nginx:latest .
    docker push alexmass/bokm-nginx:$bokm_version
    docker push alexmass/bokm-nginx:latest
    cd -