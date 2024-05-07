<template>
  <div>
    <AppHeader />
    <div class="container-fluid">
      <slot />
    </div>
    <AppFooter />

    <BackToTop />
  </div>
</template>

<style>
table {
  border-collapse: collapse;
  margin: 25px auto;
  font-size: 0.9em;
  font-family: sans-serif;
  min-width: 400px;
}

thead tr {
  background-color: #009879;
  color: #ffffff;
  text-align: left;
}

th,
td {
  padding: 12px 15px;
}

tbody tr {
  border-bottom: 1px solid #dddddd;
}

tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

tbody tr:last-of-type {
  border-bottom: 2px solid #009879;
}

h1 {
  font-size: 3rem;
  line-height: 1;
  font-weight: 800;
  margin-bottom: 1rem;
}

h2 {
  font-size: 2.25rem;
  line-height: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  margin-top: 2rem;
}

h3 {
  font-size: 1.875rem;
  line-height: 2.25rem;
  font-weight: 700;
}

h4 {
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 700;
}

h5 {
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 700;
}

h6 {
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 700;
}

blockquote {
  background-color: #f0f2f5;
  padding: 50px !important;
  border-left: 10px solid #000;
}

.list-none {
  list-style-type: none;
}
</style>
