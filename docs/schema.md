# Database schema

### Users
| column_name | data_type | details |
|-------------|-----------|---------|
| id | integer | not null, primary_key |
| email | string | not null, unique |
| password_digest | string | not null, indexed |
| session_token | string | not null, indexed |


### Notes
| column_name | data_type | details |
|-------------|-----------|---------|
| id | integer | not null, primary_key |
| title | string | indexed, default=""|
| body | text | default="" |
| author_id | integer | foreign_key, indexed |
| notebook_id | integer | foreign_key, indexed |

### Notebooks
| column_name | data_type | details |
|-------------|-----------|---------|
| id | integer | not null, primary_key |
| title | string | not null, indexed |

### Tags
| column_name | data_type | details |
|-------------|-----------|---------|
| id | integer | not null, primary_key |
| name | string | not null, unique |

### Taggings

| column_name | data_type | details |
|-------------|-----------|---------|
| id | integer | not null, primary_key |
| tag_id | integer | not null, foreign_key, indexed |
| note_id | integer | not null, foreign key, indexed |
