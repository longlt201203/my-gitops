# my-gitops

Call the Github Actions API (POST method):

```
https://api.github.com/repos/longlt201203/my-gitops/actions/workflows/105840951/dispatches
```

Body:

```json
{
  "ref": "main",
  "inputs": {
    "run_id": "run_id",
    "project": "project"
  }
}
```

Header:

```
Authorization: Bearer <Personal Access Token (PAT)>
```

Example:

```shell
curl --location 'https://api.github.com/repos/longlt201203/my-gitops/actions/workflows/105840951/dispatches' \
--header 'Content-Type: application/json' \
--header 'Authorization: ••••••' \
--data '{
  "ref": "main",
  "inputs": {
    "run_id": "run_id",
    "project": "project"
  }
}'
```
