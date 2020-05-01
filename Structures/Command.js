class Command {
  constructor(client, options) {
    this.client = client;
    this.name = options.name || null;
    this.description = options.description || "No description.";
    this.category = options.category || "Other";
    this.aliases = options.aliases || [];
    this.usage = options.usage || "No usage found.";
  }
}
exports.Command = Command;
