const BaseController = require("./BaseController");

class ProfileController extends BaseController {
  /**
   * Create a new profile.
   * @param {import('express').Request} req - The request object from Express.
   * @param {import('express').Response} res - The response object from Express.
   * @returns {Promise<import("@prisma/client").Profile>}
   */
  async create(req, res) {
    try {
      const { dob, fullname } = req.body;
      const createProfile = await this.db.profile.create({
        data: { dob, fullname },
      });
      return this.created(res, {
        code: res.statusCode,
        data: createProfile,
        message: "profile created successfully",
      });
    } catch (error) {
      return this.fail(res, error.message);
    }
  }

  /**
   * Get profile details by ID.
   * @param {import('express').Request} req - The request object from Express.
   * @param {import('express').Response} res - The response object from Express.
   * @returns {Promise<import("@prisma/client").Profile>}
   */
  async getDetail(req, res) {
    try {
      const { id } = req.params;
      const result = await this.db.profile.findUnique({ where: { id } });
  
      if (!result) {
        return this.notFound(res, "Profile not found.");
      }
  
      return this.ok(res, {
        code: res.statusCode,
        data: result,
        message: "Successfully retrieved profile details",
      });
    } catch (error) {
      return this.fail(res, error.message);
    }
  }

  /**
   * Update profile details by ID.
   * @param {import('express').Request} req - The request object from Express.
   * @param {import('express').Response} res - The response object from Express.
   * @returns {Promise<import("@prisma/client").Profile>}
   */
  async update(req, res) {
    try {
      const { id } = req.params;
      const { dob, fullname } = req.body;
      const updatedProfile = await this.db.profile.update({
        where: { id },
        data: { dob, fullname },
      });
      return this.ok(res, {
        code: res.statusCode,
        data: updatedProfile,
        message: "profile updated successfully",
      });
    } catch (error) {
      return this.fail(res, error.message);
    }
  }

  /**
   * Delete profile by ID.
   * @param {import('express').Request} req - The request object from Express.
   * @param {import('express').Response} res - The response object from Express.
   * @returns {Promise<void>}
   */
  async delete(req, res) {
    try {
      const { id } = req.params;
      await this.db.profile.delete({ where: { id } });
      return this.ok(res, {
        code: res.statusCode,
        message: "profile deleted successfully",
      });
    } catch (error) {
      return this.fail(res, error.message);
    }
  }
}

module.exports = ProfileController;