class getUserResource {
  constructor(data) {
    this.id = data.id;
    this.fullName = data.fullName || null;
    this.email = data.email || null;
    this.role = data.role;
    this.password = data.password || null;
  }
}

export default getUserResource;
