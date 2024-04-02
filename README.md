# Relationships

(Cardinality)

One-to-One  1 x 1 (Prime Minister -> Country)
One-to-Many  1 x N(User -> Posts)
Many-to-Many N x N (Students -> Subjects)

# Mongo Relationships

One to many / Approach 1 ( one to few )
Store the child document inside parent

One to many / Approach 2(one tp many)
Store the reference(pointer) to the child document inside the parent

One to many / Approach 3(one tp squillions)
Store the reference(pointer) to the child document inside the parent
